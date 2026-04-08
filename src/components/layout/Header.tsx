import { navigationService } from '@/services';
import { HeaderMenu } from './HeaderMenu';

export async function Header() {
  const [menu, icons, button] = await Promise.all([
    navigationService.getHeaderMenu('header'),
    navigationService.getHeaderIcons(),
    navigationService.getHeaderButton(),
  ]);

  return <HeaderMenu menu={menu} icons={icons} button={button} />;
}
