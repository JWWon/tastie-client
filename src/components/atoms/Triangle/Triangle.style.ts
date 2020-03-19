import styled from 'styled-components/native';

import {Props} from './Triangle.type';

// HELPERS
type Point = Props['point'];
interface Actions {
  down: string;
  right: string;
}
const select = (point: Point, actions: Actions) => actions[point];

// STYLES
export const Position = styled.View<Props>`
  position: absolute;
  ${({point, width, height}) =>
    select(point, {
      down: `
        bottom: -${height}px;
        left: 0;
        width: 100%;
        height: ${height}px;
        align-items: center;
      `,
      right: `
        right: -${width}px;
        top: 0;
        height: 100%;
        width: ${width}px;
        justify-content: center;
      `,
    })}
`;

const borderWidth = 1;
export const Background = styled.View<Props>`
  /* size */
  width: 0;
  height: 0;
  border-width: ${({point, width, height}) =>
    select(point, {
      down: `${width}px`,
      right: `${height}px`,
    })};
  ${({theme, active, point, width, height}) =>
    select(point, {
      down: `
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-width: 0;
      border-top-width: ${height}px;
      border-top-color: ${active ? theme.color.blue : 'transparent'};
    `,
      right: `
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-right-width: 0;
      border-left-width: ${width}px;
      border-left-color: ${active ? theme.color.blue : 'transparent'};
    `,
    })}
`;

export const Overlay = styled(Background)<Props>`
  /* position */
  ${({point, width, height}) =>
    select(point, {
      down: `
        margin-left: -${width}px;
        margin-top: -${height}px;
      `,
      right: `
        margin-top: -${height}px;
        margin-left: -${width}px;
      `,
    })}
  /* style */
  ${({theme, point}) =>
    select(point, {
      down: `
        border-top-color: ${theme.color.blackBorder};
      `,
      right: `
        border-left-color: ${theme.color.blackBorder};
      `,
    })}
`;

export const Inside = styled(Background)<Props>`
  /* position */
  ${({point, width, height}) =>
    select(point, {
      down: `
        margin-left: -${width}px;
        margin-top: -${height + borderWidth + 0.5}px;
      `,
      right: `
        margin-top: -${height}px;
        margin-left: -${width + borderWidth + 0.5}px;
      `,
    })}
  /* size */
  ${({theme, active, point}) =>
    select(point, {
      down: `
        border-top-color: ${active ? theme.color.blue : theme.color.white};
      `,
      right: `
        border-left-color: ${active ? theme.color.blue : theme.color.white};
      `,
    })}
`;
