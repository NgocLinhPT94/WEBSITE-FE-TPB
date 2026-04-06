'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components/ui';

export function HeaderMenu({ menu, icons }) {
  const level1 = [...menu].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const [activeLv1, setActiveLv1] = useState(level1[0]);
  const [activeLv2, setActiveLv2] = useState(null);
  const logo = icons?.find((i) => i.label === 'logo');

  return (
    <header className="border-b bg-white relative">
      {logo?.icon && (
        <Link
          href={logo.url || '/'}
          target={logo.external ? '_blank' : '_self'}
          className="
            absolute
            left-10
            top-[52px]
            -translate-y-1/2
            z-50
            bg-white
            px-4
          "
        >
          <img src={logo.icon} alt="logo" className="h-12 w-auto object-contain" />
        </Link>
      )}

      {/* ================= LEVEL 1 ================= */}
      <div className="border-b">
        <Container>
          <ul className="flex h-10 items-center gap-8 text-sm">
            {level1.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  onMouseEnter={() => {
                    setActiveLv1(item);
                    setActiveLv2(null);
                  }}
                  className={`pb-2 transition-all ${
                    activeLv1?.id === item.id
                      ? 'font-bold text-[#7B35BB] border-b-2 border-[#7B35BB]'
                      : 'text-gray-500'
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* ================= LEVEL 2 ================= */}
      <div className="border-b">
        <Container>
          <ul className="flex h-14 items-center gap-8 font-medium">
            {activeLv1?.children?.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.url}
                  onMouseEnter={() => setActiveLv2(child)}
                  className="
                    pb-4 transition
                    text-gray-700
                    hover:font-bold
                    hover:text-[#7B35BB]
                    hover:border-b-2
                    hover:border-[#7B35BB]
                  "
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* ================= LEVEL 3 ================= */}
      {activeLv2?.children?.length > 0 && (
        <div className="bg-gray-50" onMouseLeave={() => setActiveLv2(null)}>
          <Container>
            <ul className="grid grid-cols-3 gap-y-3 py-6 text-sm">
              {activeLv2.children.map((sub) => (
                <li key={sub.id} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                  <Link href={sub.url} className="hover:text-[#7B35BB]">
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
