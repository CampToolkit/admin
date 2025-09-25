"use client";

import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import BaseAspectCard from "@/common/components/BaseAspectCard.tsx";

// @ts-expect-error:TS2307
import "swiper/css";

type SliderCardsProps<T> = {
  renderItem: (item: T) => ReactNode;
  items: T[];
};

export default function BaseSlider<T extends { keyId: string | number }>(
  props: SliderCardsProps<T>,
) {
  return (
    <Box sx={{ width: "100%", maxWidth: 900 }}>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.2} // сколько карточек видно
        breakpoints={{
          600: { slidesPerView: 2.2 },
          900: { slidesPerView: 3.2 },
        }}
      >
        {props.items.map((item) => (
          <SwiperSlide key={item.keyId}>
            <BaseAspectCard sx={{ p: 2, bgcolor: "grey.100" }}>
              {props.renderItem(item)}
            </BaseAspectCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
