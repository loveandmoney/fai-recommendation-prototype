'use client';

import { LinkButton } from './LinkButton';

export const Header = () => {
  return (
    <header>
      <nav className="flex gap-4 p-8">
        <LinkButton href="/" title="Home" />
        <LinkButton href="/search" title="Search" />
        <LinkButton href="/form" title="Form" />
        <LinkButton href="/all-houses" title="All Houses" />
        <LinkButton
          href="/house-recommendations"
          title="House Recommendations"
        />
        <LinkButton href="/all-content" title="All Content" />
        <LinkButton
          href="/content-recommendations"
          title="Content Recommendations"
        />
        <LinkButton href="/set-cookie" title="Set Cookie" />
        <LinkButton href="/get-cookie" title="Get Cookie" />
      </nav>
    </header>
  );
};
