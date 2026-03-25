import 'styled-components';
import { AppTheme } from '~/types';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
