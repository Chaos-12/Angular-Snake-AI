export interface Predicate<T>{
  (t:T):boolean;
}

export interface BiPredicate<T,S>{
  (t:T, s:S):boolean;
}
