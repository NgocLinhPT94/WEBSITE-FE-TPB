import { navigationService } from '@/services';
import { HeaderMenu } from './HeaderMenu';

export async function Header() {
  const [menu, icons] = await Promise.all([
    navigationService.getHeaderMenu('header'),
    navigationService.getHeaderIcons(),
  ]);

  return <HeaderMenu menu={menu} icons={icons} />;
}
