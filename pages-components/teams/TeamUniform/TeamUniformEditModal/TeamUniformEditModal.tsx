import { Button, ColorPicker, Group, Paper } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import s from './TeamUniformEditModal.module.scss';
import { UniformType } from '../TeamUniform';

export const TeamUniformEditModal = ({ uniformInitial, onSaveForm }: { uniformInitial: UniformType; onSaveForm: (uniform: UniformType) => void }) => {
  const [uniform, setUniform] = useState<UniformType>(uniformInitial ? uniformInitial : { shirt_left: '#fff', shirt_right: '#fff', socks: '#fff', shorts: '#fff' });
  const [color, setColor] = useState<string>('');
  const [currentSlot, setCurrentSlot] = useState<'shirt_left' | 'shirt_right' | 'socks' | 'shorts'>('shirt_left');
  const ref = useClickOutside(() => setCurrentSlot(null));

  const onSlotClick = slot => {
    setCurrentSlot(slot);
    uniform[slot] = color;
    setUniform({ ...uniform });
  };

  return (
    <>
      <Group noWrap>
        <Paper className={s.uniform}>
          <svg ref={ref} stroke={'#c1c1c1'} width="260" height="230" viewBox="0 0 83 128" xmlns="http://www.w3.org/2000/svg">
            <g className={`${s.uniformPath} ${currentSlot == 'shirt_left' && s.activeSlot}`} onClick={() => onSlotClick('shirt_left')} fill={uniform?.shirt_left}>
              <path d="M73.5536 17.8267C74.0723 16.8263 73.6626 15.5952 72.648 15.1051L52.0246 5.14405C51.9608 5.12179 51.8929 5.11383 51.8257 5.12072C51.7585 5.12761 51.6936 5.1492 51.6357 5.18394C51.5778 5.21868 51.5282 5.26573 51.4904 5.32177C51.4527 5.3778 51.4277 5.44144 51.4173 5.50819C50.9863 8.09067 49.6532 10.4366 47.6553 12.1287C45.6573 13.8208 43.6194 15 41.0012 15L41 55.3125H57.0949C57.3896 55.3162 57.6814 55.2552 57.95 55.1339C58.273 54.9797 58.5442 54.7348 58.7304 54.4291C58.9166 54.1234 59.0098 53.7701 58.9986 53.4123L58.1539 25.6523C58.147 25.421 58.2272 25.1956 58.3788 25.0208C58.5304 24.8459 58.7422 24.7345 58.9721 24.7085L65.6977 28.487C66.6836 29.0409 67.9322 28.6679 68.4528 27.664L73.5536 17.8267Z" />
            </g>

            <g className={`${s.uniformPath} ${currentSlot == 'shirt_right' && s.activeSlot}`} onClick={() => onSlotClick('shirt_right')} fill={uniform?.shirt_right}>
              <path d="M8.94638 17.8267C8.42769 16.8263 8.83738 15.5952 9.85204 15.1051L30.4754 5.14405C30.5392 5.12179 30.6071 5.11383 30.6743 5.12072C30.7415 5.12761 30.8064 5.1492 30.8643 5.18394C30.9222 5.21868 30.9718 5.26573 31.0096 5.32177C31.0473 5.3778 31.0723 5.44144 31.0827 5.50819C31.5137 8.09067 32.8468 10.4366 34.8447 12.1287C36.8427 13.8208 38.8806 15 41.4988 15L41.5 55.3125H25.4051C25.1104 55.3162 24.8186 55.2552 24.55 55.1339C24.227 54.9797 23.9558 54.7348 23.7696 54.4291C23.5834 54.1234 23.4902 53.7701 23.5014 53.4123L24.3461 25.6523C24.353 25.421 24.2728 25.1956 24.1212 25.0208C23.9696 24.8459 23.7578 24.7345 23.5279 24.7085L16.8023 28.487C15.8164 29.0409 14.5678 28.6679 14.0472 27.664L8.94638 17.8267Z" />
            </g>

            <g className={`${s.uniformPath} ${currentSlot == 'shorts' && s.activeSlot}`} onClick={() => onSlotClick('shorts')} fill={uniform?.shorts}>
              <path d="M25.3734 56.3542C24.3917 56.3542 23.5552 57.0666 23.3989 58.0357L18.3739 89.1933C18.1778 90.4092 19.1168 91.5117 20.3484 91.5117H34.9918C35.8395 91.5117 36.5951 90.9773 36.8775 90.1781L39.4529 82.8903C40.0709 81.1414 42.5303 81.103 43.2026 82.8318L46.0822 90.2366C46.3812 91.0054 47.1214 91.5117 47.9463 91.5117H62.1515C63.3831 91.5117 64.3221 90.4091 64.1259 89.1932L59.0989 58.0356C58.9426 57.0665 58.1061 56.3542 57.1245 56.3542H25.3734Z" />
            </g>

            <g className={`${s.uniformPath} ${currentSlot == 'socks' && s.activeSlot}`} onClick={() => onSlotClick('socks')} fill={uniform?.socks} clipPath="url(#clip0_2030_8691)">
              <path d="M59.9159 96.8096C61.0642 96.8096 61.9768 97.7744 61.9128 98.921L60.4605 124.958C60.4014 126.017 59.5249 126.846 58.4636 126.846L50.557 126.846C49.4525 126.846 48.557 125.951 48.557 124.846L48.5571 98.8096C48.5571 97.705 49.4525 96.8096 50.557 96.8096L59.9159 96.8096Z" />
              <path d="M22.0607 96.8096C20.9123 96.8096 19.9998 97.7744 20.0638 98.921L21.516 124.958C21.5751 126.017 22.4516 126.846 23.5129 126.846L31.4195 126.846C32.5241 126.846 33.4195 125.951 33.4195 124.846L33.4195 98.8096C33.4195 97.705 32.5241 96.8096 31.4195 96.8096L22.0607 96.8096Z" />
            </g>
            <defs>
              <clipPath id="clip0_2030_8691">
                <rect x="19" y="95" width="44" height="33" rx="5" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Paper>
        <ColorPicker ref={ref} value={color} onChange={setColor} fullWidth size="xl" />
      </Group>
      <Button onClick={() => onSaveForm(uniform)} fullWidth mt={'xl'}>
        Save
      </Button>
    </>
  );
};
