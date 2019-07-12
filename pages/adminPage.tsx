import * as React from 'react';
import { GetInitialPropsContext } from '../utils/types';
import { redirect } from '../utils/redirect';
import Layout from '../components/layout/Layout';
import QuestionsListLayout from '../components/questions/questionsListLayout/QuestionsListLayout';
import { AsyncComponent } from '../components/asyncComponent/AsyncComponent';
import { getLoggedInUser } from '../redux/selectors/selectors';

export default class AdminPage extends React.Component {
  static async getInitialProps(ctx: GetInitialPropsContext) {
    const state = ctx.store.getState();
    if (!getLoggedInUser(state)) {
      return redirect(ctx, '/login', '/admin');
    }
  }

  render() {
    return (
      <Layout title="Admin">
        <QuestionsListLayout>
          <div className="questions-container">
            <AsyncComponent
              componentProps={{}}
              componentProvider={() => {
                const component = import('../components/adminQuestions/AdminQuestions').then(
                  module => module.default
                );
                return component;
              }}
            />
          </div>
        </QuestionsListLayout>
      </Layout>
    );
  }
}