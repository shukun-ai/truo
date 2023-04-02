import { MantineProvider } from '@mantine/core';

export type ThemeProviderProps = {
  children: JSX.Element;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MantineProvider
      theme={{
        defaultRadius: 1,
        colors: {
          blue: [
            '#F4FAFF',
            '#DDF1FF',
            '#ADDBFF',
            '#6FB6FF',
            '#3990FF',
            '#096BDE',
            '#054DA7',
            '#02367D',
            '#072859',
            '#00153C',
          ],
        },
        components: {
          Text: {
            defaultProps: {
              size: 'sm',
            },
          },
          Button: {
            defaultProps: {
              size: 'sm',
            },
          },
          Table: {
            defaultProps: {
              horizontalSpacing: 'sm',
              verticalSpacing: 'md',
              fontSize: 'sm',
            },
          },
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProvider>
  );
};
