import { Box, Grid } from '@mantine/core';

import { PresenterScreenEntity } from '../../../../../../repositories/presenter/screen-ref';

import { Screen } from './screen';
import { ScreenCreateButton } from './screen-create-button';

export type ScreensProps = {
  screens: PresenterScreenEntity[];
};

export const Screens = ({ screens }: ScreensProps) => {
  return (
    <Box>
      <Grid mb={12}>
        {screens.map((screen) => (
          <Grid.Col span={6}>
            <Screen screen={screen} key={screen.id} />
          </Grid.Col>
        ))}
      </Grid>
      <ScreenCreateButton />
    </Box>
  );
};
