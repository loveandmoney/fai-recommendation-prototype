'use client';

import { LinkButton } from './LinkButton';

export const Header = () => {
  return (
    <header>
      <nav className="flex gap-4 p-8">
        <LinkButton href="/" title="Home" />
        <LinkButton href="/houses" title="Houses" />
        <LinkButton href="/form" title="Form" />
        <LinkButton href="/dynamic" title="Dynamic Content" />
      </nav>
    </header>
  );
};
