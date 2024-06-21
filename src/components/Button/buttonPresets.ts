import { ThemeColors } from '@theme';
import { TouchableOpacityBoxProps } from '../Box';

import { ButtonPreset } from './index';

interface ButtonUI {
  container: TouchableOpacityBoxProps;
  content: ThemeColors;
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: 'white',
    },
    disabled: {
      container: {
        backgroundColor: 'primary',
        activeOpacity: 0.4,
      },
      content: 'white',
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'blue',
      },
      content: 'white',
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'blue',
      },
      content: 'white',
    },
  },
  default: {
    default: {
      container: {
        backgroundColor: 'blue',
      },
      content: 'white',
    },
    disabled: {
      container: {
        backgroundColor: 'blue',
        activeOpacity: 0.4,
      },
      content: 'white',
    },
  },

  danger: {
    default: {
      container: {
        backgroundColor: 'red',
      },
      content: 'white',
    },
    disabled: {
      container: {
        backgroundColor: 'red',
      },
      content: 'white',
    },
  },
};
