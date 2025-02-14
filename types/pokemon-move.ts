interface PokemonMove {
  accuracy: number;
  contest_combos: Contestcombos;
  contest_effect: Contesteffect;
  contest_type: Useafter;
  damage_class: Useafter;
  effect_chance: number;
  effect_changes: any[];
  effect_entries: Effectentry[];
  flavor_text_entries: Flavortextentry[];
  generation: Useafter;
  id: number;
  learned_by_pokemon: Useafter[];
  machines: Machine[];
  meta: Meta;
  name: string;
  names: Name[];
  past_values: any[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: any[];
  super_contest_effect: Contesteffect;
  target: Useafter;
  type: Useafter;
}

interface Name {
  language: Useafter;
  name: string;
}

interface Meta {
  ailment: Useafter;
  ailment_chance: number;
  category: Useafter;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: null;
  max_turns: null;
  min_hits: null;
  min_turns: null;
  stat_chance: number;
}

interface Machine {
  machine: Contesteffect;
  version_group: Useafter;
}

interface Flavortextentry {
  flavor_text: string;
  language: Useafter;
  version_group: Useafter;
}

interface Effectentry {
  effect: string;
  language: Useafter;
  short_effect: string;
}

interface Contesteffect {
  url: string;
}

interface Contestcombos {
  normal: Normal;
  super: Super;
}

interface Super {
  use_after: null;
  use_before: null;
}

interface Normal {
  use_after: Useafter[];
  use_before: Useafter[];
}

interface Useafter {
  name: string;
  url: string;
}