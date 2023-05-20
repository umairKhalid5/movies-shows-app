import React from 'react';
import { CSSTransition } from 'react-transition-group';

const TransitionWrapper = ({ inCondition, children, eTime }) => {
  return (
    <CSSTransition
      in={inCondition}
      mountOnEnter
      unmountOnExit
      timeout={{
        enter: eTime ? eTime : 1500,
        exit: 10,
      }}
      classNames={{
        enter: '',
        enterActive: `main show ${eTime && 'suggestion'}`,
        exit: '',
        exitActive: 'main hide',
      }}
    >
      <>{children}</>
    </CSSTransition>
  );
};

export default TransitionWrapper;
