import { h } from 'preact';
import styled from 'styled-components';
import Router, { Route } from 'preact-router';
import { Examples } from '../examples/examples.component';
import AsyncRoute from 'preact-async-route';
import { Spinner } from '../ui/spinner/spinner.components';
import { NotFound } from './not-found.component';

export const Content = () => (
  <Wrap>
    <Router>
      <Route path='/' component={Examples} />
      <AsyncRoute
        path='/prime'
        loading={() => <Spinner />}
        getComponent={() =>
          import('../examples/prime/prime.component').then(({ Prime }) => Prime)
        }
      />
      <AsyncRoute
        path='/faces'
        loading={() => <Spinner />}
        getComponent={() =>
          import('../examples/faces/faces.component').then(
            ({ FacesComponent }) => FacesComponent,
          )
        }
      />
      <Route component={NotFound} default={true} />
    </Router>
  </Wrap>
);

const Wrap = styled.section`
  padding: 0 1em 1em 1em;
  border: 1px solid var(--border-color);
  border-top: none;
  border-bottom: none;
  flex: 1;
  background: var(--white);

  @media all and (max-width: 400px) {
    padding: 0 0 1em 0;
  }
`;
