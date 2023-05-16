import { ApolloServer, gql } from 'apollo-server';
import { AnswersMap } from './src/components/Questionnaire/Questionnaire';

const typeDefs = gql`
  input QuestionnaireAnswerInput {
    question: String!
    answer: [String]!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    submitQuestionnaire(answers: [QuestionnaireAnswerInput!]!): String
  }
`;

const resolvers = {
  Mutation: {
    submitQuestionnaire: (_: any, { answers }: { answers: AnswersMap }) => {
      // Process and handle the submitted questionnaire answers here
      console.log('Got the answers', answers);
      return 'Questionnaire submitted successfully!';
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
