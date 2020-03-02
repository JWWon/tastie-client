import React from 'react';

import BaseView from '@components/templates/BaseView';
import Title from '@components/atoms/TextHighlight';
import Description, {
  Props as DescriptionProps,
} from '@components/atoms/Description';
import Dismiss, {Props as DismissProps} from '@components/atoms/Dismiss';
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
  <BaseView noWrapper>
    <s.Container>
      <s.ScreenWrapper hasDismiss={!!dismiss}>
        <s.HeaderWrapper>
          <Title message={title} />
          {description && <Description {...description} />}
        </s.HeaderWrapper>
        {children}
      </s.ScreenWrapper>

      {dismiss && <Dismiss absolute {...dismiss} />}

      {pageButton && (
        <s.PageButtonWrapper>
          <PageButton {...pageButton} />
        </s.PageButtonWrapper>
      )}
    </s.Container>
  </BaseView>
);

export default StackView;
