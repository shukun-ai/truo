import { MantineProvider, rem } from '@mantine/core';

export type ThemeProviderProps = {
  children: JSX.Element;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MantineProvider
      theme={{
        fontSizes: {
          xs: rem(10),
          sm: rem(12),
          md: rem(14),
          lg: rem(16),
          xl: rem(18),
        },
        spacing: {
          xs: rem(10),
          sm: rem(12),
          md: rem(14),
          lg: rem(16),
          xl: rem(24),
        },
        headings: {
          sizes: {
            h1: { fontSize: rem(28), lineHeight: '1.3' },
            h2: { fontSize: rem(22), lineHeight: '1.35' },
            h3: { fontSize: rem(20), lineHeight: '1.4' },
            h4: { fontSize: rem(16), lineHeight: '1.45' },
            h5: { fontSize: rem(14), lineHeight: '1.5' },
            h6: { fontSize: rem(12), lineHeight: '1.5' },
          },
        },
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
        defaultRadius: 3,
        components: {
          Switch: {
            defaultProps: {
              size: 'xs',
            },
          },
          Radio: {
            defaultProps: {
              size: 'xs',
            },
          },
          RadioGroup: {
            defaultProps: {
              size: 'xs',
            },
          },
          TextInput: {
            defaultProps: {
              size: 'xs',
            },
          },
          NumberInput: {
            defaultProps: {
              size: 'xs',
            },
          },
          Select: {
            defaultProps: {
              size: 'xs',
            },
          },
          NativeSelect: {
            defaultProps: {
              size: 'xs',
            },
          },
          Checkbox: {
            defaultProps: {
              size: 'xs',
            },
          },
          ColorInput: {
            defaultProps: {
              size: 'xs',
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
