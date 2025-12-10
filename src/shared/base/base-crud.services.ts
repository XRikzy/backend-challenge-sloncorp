import { SupabaseService } from '@/supabase/supabase.service';
import { CrudService } from '../classes/CrudServices.services';
export abstract class BaseCrudService<T extends Record<string, string>> {
  protected Crud: CrudService<T>;
  constructor(
    tableName: string,
    message: T,
    supabaseServices: SupabaseService,
  ) {
    this.Crud = new CrudService<T>(tableName, message, supabaseServices);
  }
}
