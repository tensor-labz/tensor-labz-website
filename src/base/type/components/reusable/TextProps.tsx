import { AnimateVariables, ParentType } from '../../CommonType';

export type Textprops = ParentType & {
  varaint?: 'heading' | 'normal' | 'caption' | 'display' | 'hero';
};
export type PageTitleProps = ParentType &
  AnimateVariables & {
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    padding?: string;
  };
