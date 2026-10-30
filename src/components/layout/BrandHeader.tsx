import React from 'react';
import { ApplicationHeader, ApplicationHeaderProps } from '../organisms/HeaderAndNavigation';

export type BrandHeaderProps = ApplicationHeaderProps;

/**
 * BrandHeader Component
 * Refactored to delegate to production ApplicationHeader organism (52px height, slim design).
 */
export const BrandHeader: React.FC<BrandHeaderProps> = (props) => {
  return <ApplicationHeader {...props} />;
};
