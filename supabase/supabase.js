import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://wyeymodgkixgrbghmyme.supabase.co'
const supabaseAnonKey = 'sb_publishable_r3XEjvA7KjSDdBfMsVJQ6w_fLjP1D0W'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)