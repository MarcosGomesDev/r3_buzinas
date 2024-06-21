import React from 'react';
import { Pressable } from 'react-native';

import { useAppTheme } from '@hooks';
import { ThemeColors } from '@theme';

import { ArrowLeftIcon } from '../../assets/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../assets/icons/ArrowRightIcon';
import { BellIcon } from '../../assets/icons/BellIcon';
import { BellOnIcon } from '../../assets/icons/BellOnIcon';
import { BookmarkFillIcon } from '../../assets/icons/BookmarkFillIcon';
import { BookmarkIcon } from '../../assets/icons/BookmarkIcon';
import { CameraIcon } from '../../assets/icons/CameraIcon';
import { ChatIcon } from '../../assets/icons/ChatIcon';
import { ChatOnIcon } from '../../assets/icons/ChatOnIcon';
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { CheckRoundIcon } from '../../assets/icons/CheckRoundIcon';
import { ChevronRightIcon } from '../../assets/icons/ChevronRightIcon';
import { CommentIcon } from '../../assets/icons/CommentIcon';
import { ErrorRoundIcon } from '../../assets/icons/ErrorRoundIcon';
import { EyeOffIcon } from '../../assets/icons/EyeOffIcon';
import { EyeOnIcon } from '../../assets/icons/EyeOnIcon';
import { FlashOffIcon } from '../../assets/icons/FlashOffIcon';
import { FlashOnIcon } from '../../assets/icons/FlashOnIcon';
import { HeartFillIcon } from '../../assets/icons/HeartFillIcon';
import { HeartIcon } from '../../assets/icons/HeartIcon';
import { HomeFillIcon } from '../../assets/icons/HomeFillIcon';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import { LockFillIcon } from '../../assets/icons/LockFillIcon';
import { MenuIcon } from '../../assets/icons/MenuIcon';
import { MessageIcon } from '../../assets/icons/MessageIcon';
import { MessageRoundIcon } from '../../assets/icons/MessageRoundIcon';
import { MinusIcon } from '../../assets/icons/MinusIcon';
import { NewPostIcon } from '../../assets/icons/NewPostIcon';
import { PinMapIcon } from '../../assets/icons/PinMapIcon';
import { PlusIcon } from '../../assets/icons/PlusIcon';
import { ProfileFillIcon } from '../../assets/icons/ProfileFillIcon';
import { ProfileIcon } from '../../assets/icons/ProfileIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { SettingsIcon } from '../../assets/icons/SettingsIcon';
import { SmartphoneIcon } from '../../assets/icons/SmartphoneIcon';
import { StarIcon } from '../../assets/icons/StarIcon';
import { TrashIcon } from '../../assets/icons/TrashIcon';
import { WarningIcon } from '../../assets/icons/WarningIcon';
import { UserFillIcon } from '../../assets/icons/userFillIcon';
export interface IconBase {
  size?: number;
  color?: string;
}

export interface IconProps {
  name: IconName;
  color?: ThemeColors;
  size?: number;
  onPress?: () => void;
}
export function Icon({ name, color = 'white', size, onPress }: IconProps) {
  const { colors } = useAppTheme();
  const SVGIcon = iconRegistry[name];

  if (onPress) {
    return (
      <Pressable testID={name} hitSlop={10} onPress={onPress}>
        <SVGIcon color={colors[color]} size={size} />
      </Pressable>
    );
  }

  return <SVGIcon color={colors[color]} size={size} />;
}

const iconRegistry = {
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  bell: BellIcon,
  bellOn: BellOnIcon,
  bookmark: BookmarkIcon,
  bookmarkFill: BookmarkFillIcon,
  camera: CameraIcon,
  chat: ChatIcon,
  chatOn: ChatOnIcon,
  check: CheckIcon,
  checkRound: CheckRoundIcon,
  errorRound: ErrorRoundIcon,
  comment: CommentIcon,
  chevronRight: ChevronRightIcon,
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  flashOn: FlashOnIcon,
  flashOff: FlashOffIcon,
  heart: HeartIcon,
  heartFill: HeartFillIcon,
  home: HomeIcon,
  homeFill: HomeFillIcon,
  menu: MenuIcon,
  message: MessageIcon,
  messageRound: MessageRoundIcon,
  newPost: NewPostIcon,
  profile: ProfileIcon,
  profileFill: ProfileFillIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  trash: TrashIcon,
  userFill: UserFillIcon,
  lockFill: LockFillIcon,
  warning: WarningIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  star: StarIcon,
  pinMap: PinMapIcon,
  smartphone: SmartphoneIcon,
};

type IconType = typeof iconRegistry;

export type IconName = keyof IconType;