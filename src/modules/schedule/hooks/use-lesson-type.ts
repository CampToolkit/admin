import { useCallback, useEffect, useState } from "react";
import type { LessonType } from "@/common/api/lesson-type/LessonTypeApi.type.ts";
import { LessonTypeApi } from "@/common/api/lesson-type/LessonTypeApi.ts";

export function useLessonType() {
  const [state, setState] = useState<LessonType[]>([]);

  const fetch = useCallback(async () => {
    const data = await LessonTypeApi.getAll();
    setState(data);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return { state, fetch };
}
