import { ShukunLogo } from './shukun-logo';

export type ShukunBrandProps = {
  theme?: 'light' | 'dark';
  title?: string;
};

export const ShukunBrand = ({
  theme,
  title = 'Shukun System',
}: ShukunBrandProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ paddingTop: 4, marginRight: 8 }}>
        <ShukunLogo />
      </div>
      <div
        style={{
          borderRadius: 8,
          color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
          fontSize: 14,

          paddingTop: 4,
        }}
      >
        {title}
      </div>
    </div>
  );
};
