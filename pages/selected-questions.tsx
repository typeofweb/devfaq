import React from 'react';
import QuestionsListLayout from '../components/questions/questionsListLayout/QuestionsListLayout';
import Layout from '../components/layout/Layout';
import MobileActionButtons from '../components/questions/mobileActionButtons/MobileActionButtons';
import SelectedQuestions from '../components/questions/selectedQuestions/SelectedQuestions';

export default () => {
  return (
    <Layout title="Wybrane pytania">
      <QuestionsListLayout>
        <SelectedQuestions />
      </QuestionsListLayout>
      <MobileActionButtons justDownload={true} />
    </Layout>
  );
};
