import React from 'react';

import BaseView from '@components/templates/BaseView';
import Title from '@components/atoms/TextHighlight';
import Description, {
  Props as DescriptionProps,
} from '@components/atoms/Description';
import DismissButton, {
  Props as DismissProps,
} from '@components/atoms/DismissButton';
import PageButton, {
  Props as PageButtonProps,
} from '@components/molcules/PageButton';
import * as s from './StackView.style';

interface Props {
  title: string;
  description?: DescriptionProps;
  dismiss?: DismissProps;
  pageButton?: PageButtonProps;
}

const StackView: React.FC<Props> = ({
  title,
  description,
  dismiss,
  pageButton,
  children,
}) => (
  <BaseView>
    {dismiss && (
      <s.NavWrapper icon={dismiss.icon}>
        <DismissButton {...dismiss} />
      </s.NavWrapper>
    )}
    <s.ScreenWrapper hasDismiss={!!dismiss}>
      <Title message={title} />
      {description && <Description {...description} />}
      <s.ChildrenWrapper>{children}</s.ChildrenWrapper>
    </s.ScreenWrapper>

    {pageButton && <PageButton {...pageButton} />}
  </BaseView>
);

export default StackView;
