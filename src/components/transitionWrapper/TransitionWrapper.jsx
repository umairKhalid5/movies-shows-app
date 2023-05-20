import React from 'react';
import { CSSTransition } from 'react-transition-group';

const TransitionWrapper = ({ inCondition, children }) => {
  return (
    <CSSTransition
      in={inCondition}
      mountOnEnter
      unmountOnExit
      timeout={{
        enter: 1500,
        exit: 10,
      }}
      classNames={{
        enter: '',
        enterActive: 'main show',
        exit: '',
        exitActive: 'main hide',
      }}
    >
      <>{children}</>
    </CSSTransition>
  );
};

export default TransitionWrapper;
