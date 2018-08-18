import './questionItem.scss';
import * as React from 'react';
import { Question } from '../../../../redux/reducers/questions';
import * as classNames from 'classnames';
import { isQuestionSelected } from '../../questionsUtils';
import MarkdownText from '../../../markdownText/MarkdownText';
import { AnimateHeight } from '../../../animateProperty/AnimateProperty';

import { isEqual } from 'lodash';

const longDate = (dateStr?: string) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const months = [
    'stycznia',
    'lutego',
    'marca',
    'kwietnia',
    'maja',
    'czerwca',
    'lipca',
    'sierpnia',
    'września',
    'października',
    'listopada',
    'grudnia',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
const shortDate = (dateStr?: string) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

interface QuestionItemOwnProps {
  question: Question;
  selectable: boolean;
  removable: boolean;
  selectedQuestionIds: number[];
  toggleQuestion(questionId: Question['id']): any;
}

interface QuestionItemState {
  questionRemovalTimer?: NodeJS.Timer;
  isQuestionBeingRemoved: boolean;
}

const QUESTION_DELETION_DELAY = 5000;

interface QuestionContentProps {
  selectable: boolean;
  removable: boolean;
  isSelected: boolean;
  isQuestionBeingRemoved: boolean;
  question: Question;
  toggleQuestion(): any;
  deleteQuestion(): any;
}

class QuestionContent extends React.PureComponent<QuestionContentProps> {
  render() {
    const { question, isSelected } = this.props;

    return (
      <div
        className={classNames('app-questions--question', {
          active: isSelected,
        })}
      >
        {this.maybeRenderCheckbox()}

        <div className="app-questions--question--text" itemProp="text">
          <MarkdownText value={question.question} />
        </div>

        {this.renderMeta()}
        {this.maybeRenderDeleteButton()}
      </div>
    );
  }

  maybeRenderCheckbox() {
    if (!this.props.selectable) {
      return null;
    }

    return (
      <input
        onChange={this.props.toggleQuestion}
        checked={this.props.isSelected}
        type="checkbox"
        className="app-questions--question--checkbox"
      />
    );
  }

  renderMeta() {
    const { question } = this.props;
    const keywords = [question.level, question.category].join(', ');

    return (
      <div className="app-questions--question--meta">
        <span
          className={classNames(
            'app-questions--question--tag',
            `app-questions--question--tag_${question.level}`
          )}
        >
          {question.level}
        </span>
        <meta itemProp="dateCreated" content={question.acceptedAt} />
        <meta itemProp="keywords" content={keywords} />
        <time
          dateTime={question.acceptedAt}
          className="app-questions--question--date app-questions--question--date_long"
        >
          {longDate(question.acceptedAt)}
        </time>
        <time
          dateTime={question.acceptedAt}
          className="app-questions--question--date app-questions--question--date_short"
        >
          {shortDate(question.acceptedAt)}
        </time>
      </div>
    );
  }

  maybeRenderDeleteButton() {
    if (!this.props.removable) {
      return null;
    }

    return (
      <div className="app-questions--question--remove-container">
        <button
          className="app-questions--question--remove--icon"
          onClick={this.props.deleteQuestion}
        />
      </div>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
export default class QuestionItem extends React.Component<QuestionItemOwnProps, QuestionItemState> {
  state: QuestionItemState = {
    isQuestionBeingRemoved: false,
  };

  shouldComponentUpdate(
    nextProps: Readonly<QuestionItemOwnProps>,
    nextState: Readonly<QuestionItemState>
  ): boolean {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  componentWillUnmount() {
    if (this.state.isQuestionBeingRemoved) {
      this.stopDeletionTimer();
      this.props.toggleQuestion(this.props.question.id);
    }
  }

  render() {
    const { question, selectable, removable } = this.props;
    const { isQuestionBeingRemoved } = this.state;
    const isSelected = this.isCurrentQuestionSelected();

    return (
      <article
        key={question.id}
        itemScope
        itemType="http://schema.org/Question"
        id={`question-${question.id}`}
      >
        <div className="app-questions--question-container">
          {this.maybeRenderDeleteProgress()}
          <AnimateHeight enterTime={700} exitTime={700} in={!isQuestionBeingRemoved}>
            <QuestionContent
              selectable={selectable}
              removable={removable}
              isSelected={isSelected}
              isQuestionBeingRemoved={isQuestionBeingRemoved}
              question={question}
              toggleQuestion={this.toggleQuestion}
              deleteQuestion={this.deleteQuestion}
            />
          </AnimateHeight>
        </div>
      </article>
    );
  }

  maybeRenderDeleteProgress() {
    if (!this.props.removable) {
      return null;
    }

    return (
      <div
        className={classNames('app-questions--question', 'app-questions--question_deleted', {
          'being-removed': this.state.isQuestionBeingRemoved,
        })}
        onMouseOver={this.stopDeletionTimer}
        onMouseLeave={this.startDeletionTimer}
      >
        <div className="action-icon action-icon_warning icon-small" />
        <p>Usunąłeś pytanie ze swojej listy!</p>
        <button className="round-button branding-button-inverse" onClick={this.undoDeleteQuestion}>
          Cofnij
        </button>
        {this.state.questionRemovalTimer && (
          <div className="app-questions--question_deleted--progress" />
        )}
      </div>
    );
  }

  toggleQuestion = () => {
    this.props.toggleQuestion(this.props.question.id);
  };

  deleteQuestion = () => {
    this.setState({ isQuestionBeingRemoved: true }, () => {
      this.startDeletionTimer();
    });
    this.reportEventOnSelectedQuestions('Usuń pytanie', 'Klik', this.props.question.id);
  };

  undoDeleteQuestion = () => {
    this.setState({ isQuestionBeingRemoved: false }, () => {
      this.stopDeletionTimer();
    });
    this.reportEventOnSelectedQuestions('Usuń pytanie', 'Anuluj usuwanie', this.props.question.id);
  };

  reportEventOnSelectedQuestions(action: string, label?: string, questionId?: number) {
    globalReportEvent(action, 'Wybrane pytania', label, questionId);
  }

  startDeletionTimer = () => {
    const { question } = this.props;

    if (!this.state.isQuestionBeingRemoved) {
      return;
    }
    if (this.state.questionRemovalTimer) {
      return;
    }

    const questionRemovalTimer = setTimeout(() => {
      this.props.toggleQuestion(question.id);
    }, QUESTION_DELETION_DELAY);

    this.setState({
      questionRemovalTimer,
    });
  };

  stopDeletionTimer = () => {
    if (!this.state.isQuestionBeingRemoved) {
      return;
    }
    if (!this.state.questionRemovalTimer) {
      return;
    }

    clearTimeout(this.state.questionRemovalTimer);
    this.setState({
      questionRemovalTimer: undefined,
    });
  };

  isCurrentQuestionSelected = () => {
    return isQuestionSelected(this.props.selectedQuestionIds, this.props.question.id);
  };
}
