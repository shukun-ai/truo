import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { Flex } from '../../../components/flex';
import { designSystem } from '../../../utils/design-system';

export interface DynamicProps {}

export const Dynamic: LegacyFunctionComponent<DynamicProps> = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: -320,
          top: -80,
          zIndex: designSystem.pageZIndex + 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: designSystem.pageZIndex + 2,
          }}
        />
      </div>
      <div
        style={{ position: 'absolute', zIndex: designSystem.pageZIndex + 3 }}
      >
        <div
          style={{
            letterSpacing: 1.5,
          }}
        >
          <span
            style={{
              fontSize: 32,
            }}
          >
            {/* 数昆 */}
          </span>{' '}
          <span
            style={{
              fontSize: 24,
            }}
          >
            {/* 新一代工业数字化平台 */}
          </span>
        </div>
        <div style={{ fontSize: 14, marginBottom: 32 }}>
          {/* Intelligent Manufacture Technologies */}
        </div>
        <Flex style={{ alignItems: 'center' }}>
          {/* <Avatar.Group style={{ marginRight: 32 }}>
        {["S", "H", "U", "K", "U", "N"].map((item) => (
          <Avatar
            key={item}
            style={{
              backgroundColor: Color(designSystem.headerBackground)
                .lighten(1.25)
                .hex(),
              borderColor: designSystem.headerBackground,
            }}
          >
            {item}
          </Avatar>
        ))}
      </Avatar.Group>

      <div style={{ color: "rgba(255,255,255,0.5)" }}>
        为企业赋能智能制造，助企业敏捷生产
      </div> */}
        </Flex>
      </div>
    </>
  );
};
