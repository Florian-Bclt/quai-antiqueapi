import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortDirection } from 'src/pagination/dto/pagination.dto';
import { Repository } from 'typeorm';
import { TableCreateInput, TableCreateOutput } from './dto/table-create.dto';
import { TableDeleteOutput } from './dto/table-delete.dto';
import { TableUpdateInput, TableUpdateOutput } from './dto/table-update.dto';
import { TablesPagination, TablesPaginationArgs } from './dto/tables-pagination.dto';
import { Table } from './models/table.model';


@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>) {}

  // Création de la table
  async tableCreate(
    input: TableCreateInput
    ): Promise<TableCreateOutput> {
    const newTable = this.tableRepository.create(input);
    const table = await this.tableRepository.save(newTable);
    return { table };
  }

  // Modification de la table
  async tableUpdate(
    tableId: Table['id'],
    input: TableUpdateInput
    ): Promise<TableUpdateOutput> {
    const table = await this.tableRepository.findOne({ where : {id : tableId}});
    table.title = input.title;
    table.places = input.places;
    table.available = input.available;
    await table.save();
    return { table };
  }

  // Suppression de la table
  async tableDelete(
    tableId: Table['id']
    ) : Promise<TableDeleteOutput> {
    const table = await this.tableRepository.findOne({ where : {id : tableId}});
    await table.remove();
    return { tableId };
  }

  // Recherche par tableId
  async findTableById(tableId: string): Promise<Table> {
    return this.tableRepository.findOneOrFail({where : {id : tableId}});
  }
  
  // Système de pagination pour lister les tables
  async tablesPagination(
    args: TablesPaginationArgs
    ): Promise<TablesPagination> {
      const qb = this.tableRepository.createQueryBuilder('table');
      qb.take(args.take)
      qb.skip(args.skip)
      if (args.sortBy) {
        if (args.sortBy.createdAt !== null) {
          qb.addOrderBy(
            'table.createdAt',
            args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC'
          );
        }
        if (args.sortBy.title !== null) {
          qb.addOrderBy(
            'table.title',
            args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC'
          );
        }
      }
    const [nodes, totalCount] = await qb.getManyAndCount();
    if (!nodes.length) {
      return { nodes: [], totalCount: 0 };
    }
    
    return { nodes, totalCount };
  }
}