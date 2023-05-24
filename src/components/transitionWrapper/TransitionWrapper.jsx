import React from 'react';
import { CSSTransition } from 'react-transition-group';

const TransitionWrapper = ({ inCondition, children, eTime }) => {
  return (
    <CSSTransition
      in={inCondition}
      mountOnEnter
      unmountOnExit
      timeout={{
        enter: eTime ? eTime : 1200,
        exit: 1,
      }}
      classNames={{
        enter: '',
        enterActive: `main show ${eTime && 'suggestion'}`,
        exit: '',
        exitActive: 'main hide',
      }}
    >
      {children}
    </CSSTransition>
  );
};

export default TransitionWrapper;
