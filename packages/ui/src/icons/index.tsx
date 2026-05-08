import { Icon } from './Icon';
import type { IconProps } from './Icon.types';
import { icons } from './data';

export { Icon } from './Icon';
export { icons, type IconDef, type IconName, type IconShape } from './data';
export type { IconProps, RawIconProps } from './Icon.types';

export const IconHome = (p: IconProps) => <Icon shapes={icons.home} {...p} />;
export const IconSearch = (p: IconProps) => <Icon shapes={icons.search} {...p} />;
export const IconCalendar = (p: IconProps) => <Icon shapes={icons.calendar} {...p} />;
export const IconChat = (p: IconProps) => <Icon shapes={icons.chat} {...p} />;
export const IconUser = (p: IconProps) => <Icon shapes={icons.user} {...p} />;
export const IconHeart = (p: IconProps) => <Icon shapes={icons.heart} {...p} />;
export const IconX = (p: IconProps) => <Icon shapes={icons.x} {...p} />;
export const IconPin = (p: IconProps) => <Icon shapes={icons.pin} {...p} />;
export const IconStar = (p: IconProps) => <Icon shapes={icons.star} {...p} />;
export const IconBolt = (p: IconProps) => <Icon shapes={icons.bolt} {...p} />;
export const IconCheck = (p: IconProps) => <Icon shapes={icons.check} {...p} />;
export const IconArrow = (p: IconProps) => <Icon shapes={icons.arrow} {...p} />;
export const IconFilter = (p: IconProps) => <Icon shapes={icons.filter} {...p} />;
export const IconSend = (p: IconProps) => <Icon shapes={icons.send} {...p} />;
