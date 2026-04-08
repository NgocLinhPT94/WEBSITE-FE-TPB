'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui';
import { t } from '@/lib/i18n';

export function HeaderMenu({ menu, icons, button }) {
  const level1 = [...menu].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const [activeLv1, setActiveLv1] = useState(level1[0]);
  const [activeLv2, setActiveLv2] = useState(null);
  const logo = icons?.find((i: any) => i.label === 'logo');
  const [open, setOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50); // scroll 50px thì fixed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`bg-white transition-all
    duration-300 border-b shadow-[rgba(0,0,0,0.1)_0px_15px_30px_0px]
    ${isFixed ? 'fixed top-0 left-0 w-full z-50' : 'relative'}
  `}
    >
      <div className="flex items-center px-4 w-full lg:max-w-[1170px] m-auto">
        {logo?.icon && (
          <Link
            href={logo.url || '/'}
            target={logo.external ? '_blank' : '_self'}
            className="
              z-50
              bg-white
              px-4
              w-auto
            "
          >
            <img src={logo.icon} alt="logo" className="h-auto w-[170px] object-contain" />
          </Link>
        )}
        <div className="w-full">
          {/* ================= LEVEL 1 ================= */}
          <div className="flex border-b items-center justify-content-between">
            <ul className="flex h-14 items-center gap-8 text-sm">
              {level1.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    onMouseEnter={() => {
                      setActiveLv1(item);
                      setActiveLv2(null);
                    }}
                    className={`pb-3 transition-all ${
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
            <div className="flex items-center">
              {icons
                ?.filter((item: any) => item.label !== 'logo') // bỏ logo
                .map((item: any) => (
                  <Link
                    key={item.id}
                    href={item.url || '/'}
                    target={item.external ? '_blank' : '_self'}
                    className="
                        z-50
                        bg-white
                      "
                  >
                    <img src={item.icon} alt={item.label} className="h-12 w-auto object-contain" />
                  </Link>
                ))}
            </div>
          </div>

          {/* ================= LEVEL 2 ================= */}
          <div className="flex items-center justify-content-between">
            <ul className="flex h-14 items-center gap-8 font-medium">
              {activeLv1?.children?.map((child: any) => (
                <li key={child.id}>
                  <Link
                    href={child.url}
                    onMouseEnter={() => setActiveLv2(child)}
                    className="
                        pb-3 transition
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
            <div
              className="px-4 py-2 fw-medium text-white bg-[#5C278B] rounded-5 m-2 relative"
              onClick={() => setOpen(!open)}
            >
              {t('header.login')}
              {open && (
                <div className="box-login absolute bg-white top-[60px] left-[0] p-3 w-[220px] rounded-2 shadow-[0px_15px_30px_-10px_#D4B3ED33] d-grid">
                  {button.map((item: any) => (
                    <Link
                      key={item.id}
                      href={item.url || '/'}
                      target={item.external ? '_blank' : '_self'}
                      className="
                          fw-normal
                          z-50
                          fs-6
                          lh-lg 
                          text-[#6F6F6F]
                        "
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a
                    className="
                          fw-normal
                          z-50
                          fs-6
                          lh-lg 
                          text-[#6F6F6F]
                        "
                  >
                    {t('header.loginApp')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ================= LEVEL 3 ================= */}
      {activeLv2?.children?.length > 0 && (
        <div className="bg-gray-50 border-b" onMouseLeave={() => setActiveLv2(null)}>
          <Container>
            <ul className="grid grid-cols-3 gap-y-3 py-6 text-sm">
              {activeLv2.children.map((sub: any) => (
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
