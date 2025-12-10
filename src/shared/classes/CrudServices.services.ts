import { SupabaseService } from '@/supabase/supabase.service';
import { CrudCreateDTO, CrudUpdateDTO } from '@/types/crud.types';
import { SupabaseCustomError } from '@/utils/errors/supabase-error.execption';
import { SupabaseClient } from '@supabase/supabase-js';

export class CrudService<T extends Record<string, string>> {
  public readonly client: SupabaseClient;
  private readonly nameTable: string;
  private readonly customMessage: T;

  constructor(
    nameTable: string,
    customMessage: T,
    private readonly dataBaseService: SupabaseService,
  ) {
    this.nameTable = nameTable;
    this.customMessage = customMessage;
    this.client = this.dataBaseService.getClient();
  }

  async queryCreate(
    crudDelivery: CrudCreateDTO,
    selectParam: string[] = ['*'],
  ) {
    const { data, error } = await this.client
      .from(this.nameTable)
      .insert(crudDelivery)
      .select(selectParam.join(','))
      .single();

    if (error) {
      return SupabaseCustomError.exception(error);
    }

    return {
      message: this.customMessage.CREATE,
      data,
    };
  }

  async queryFind(
    id?: number | string,
    identifierParam: string = 'id',
    selectParam: string[] = ['*'],
  ) {
    const query = this.client
      .from(this.nameTable)
      .select(selectParam.join(','));
    let oneItem = false;

    if (typeof id === 'string' || typeof id === 'number') {
      query.eq(identifierParam, id).single();
      oneItem = true;
    }

    const { data, error } = await query;

    if (error) {
      return SupabaseCustomError.exception(error);
    }

    return {
      message: oneItem ? this.customMessage.FINDBYID : this.customMessage.FIND,
      data,
    };
  }

  async queryUpdate(
    crudUpdateDto: CrudUpdateDTO,
    identifierParam: string = 'id',
    selectParam: string[] = ['*'],
  ) {
    const { data, error } = await this.client
      .from(this.nameTable)
      .update(crudUpdateDto)
      .eq(identifierParam, crudUpdateDto.id)
      .select(selectParam.join(','))
      .single();

    if (error) {
      return SupabaseCustomError.exception(error);
    }

    return {
      message: this.customMessage.UPDATE,
      data,
    };
  }

  async queryRemove(
    id: number | string,
    identifierParam: string = 'id',
    selectParam: string[] = ['*'],
  ) {
    const { data, error } = await this.client
      .from(this.nameTable)
      .delete()
      .eq(identifierParam, id)
      .select(selectParam.join(','))
      .single();

    if (error) {
      return SupabaseCustomError.exception(error);
    }

    return {
      message: this.customMessage.DELETE,
      data,
    };
  }
}
