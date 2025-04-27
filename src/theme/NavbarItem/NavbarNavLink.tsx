import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {isRegexpStringMatch} from '@docusaurus/theme-common';
import type {
  Props,
} from '@theme/NavbarItem/NavbarNavLink';

function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  ...props
}: Props): JSX.Element {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const isExternalLink = label && href && !isInternalUrl(href);
  const isDropdownItem = isDropdownLink;

  // Custom logic for 'Home' link active state
  const isHomePage = typeof window !== 'undefined' && 
    (window.location.pathname === '/' || window.location.pathname === '/index.html');

  // Check if this link is the Home link
  const isHomeLink = (label === 'Home' && (href?.includes('landing-page') || to === '/'));

  // Combine the check - Home link should be active on homepage
  const shouldBeActiveOnHome = isHomeLink && isHomePage;

  // Link content is set through html XOR label
  const linkContentProps = html
    ? {dangerouslySetInnerHTML: {__html: html}}
    : {children: label};

  if (href) {
    return (
      <Link
        href={prependBaseUrlToHref ? normalizedHref : href}
        {...props}
        {...linkContentProps}
        {...(isExternalLink && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        className={shouldBeActiveOnHome ? `${props.className || ''} activeNavbarItem` : props.className}
      />
    );
  }

  return (
    <Link
      to={toUrl}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  );
}

export default NavbarNavLink; 