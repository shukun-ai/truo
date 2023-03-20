import { Container } from '@mui/material';
import { containerDefinition, ContainerDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const ContainerWidget = createWidget<ContainerDefinitionProps>(
  containerDefinition,
  (props) => {
    return (
      <Container
        maxWidth={props.maxWidth}
        fixed={props.fixed}
        disableGutters={props.disableGutters}
      >
        {props.children}
      </Container>
    );
  },
);
