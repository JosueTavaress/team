interface GenericObject<T> {
  [key: string]: T;
}

const generateQueryGraphQl = <T>(query: string, variables: GenericObject<T>): string => {
  return JSON.stringify({
    objects: query,
    variables: {...variables}
  });
};

export default generateQueryGraphQl;