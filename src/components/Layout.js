import { Box, Text } from 'grommet';
import styled from 'styled-components';

const Layout = ({ children, center, background, titleBackground, title }) => {
  return (
    <StyledWrapper fill>
      {title ? (
        <Box pad='small' background={titleBackground}>
          <Text weight='bold' size='large'>
            {title}
          </Text>
        </Box>
      ) : null}
      <Box
        fill='vertical'
        // height={center ? '100%' : null}
        align={center ? 'center' : null}
        justify={center ? 'center' : null}
        background={background}
      >
        {children}
      </Box>
    </StyledWrapper>
  );
};

export default Layout;

const StyledWrapper = styled(Box)`
  position: absolute;
`;
