import type { Lesson } from "@/shared/api/lesson/LessonApi.type.ts";
import { useCallback, useEffect, useState } from "react";
import { LessonApi } from "@/shared/api/lesson/LessonApi.ts";

export function useLessons(campId: number) {
  const [state, setState] = useState<Lesson[]>([]);

  const fetch = useCallback(async () => {
    const data = await LessonApi.getAll({ campId });
    setState(data);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return { state, fetch };
}
