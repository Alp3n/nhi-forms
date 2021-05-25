import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

export const lightTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: '#1C94B4',
      focus: '#1C94B4',
      // nhiBackground: '',
      'blue-1': '#1C94B4',
      'blue-2': '#1E88CB',
      'blue-3': '#2064D1',
      'blue-4': '#151070',
      'portrait-1': '#F1F5FC',
      'portrait-2': '#C6D1ED',
      'portrait-3': '#CAE3F2',
    },
  },
  formField: {
    label: {
      requiredIndicator: true,
    },
  },

  tab: {
    pad: 'small',
    margin: { bottom: 'none' },
    active: {
      background: {
        color: 'light-2',
      },
    },
  },
});
