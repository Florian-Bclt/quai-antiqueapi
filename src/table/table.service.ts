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
    // Creation of table
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>
  ) {}

  async tableCreate(
    input: TableCreateInput
    ): Promise<TableCreateOutput> {
    const newTable = this.tableRepository.create(input);
    const table = await this.tableRepository.save(newTable);
    return { table };
  }

  async tableUpdate(
    tableId: Table['id'],
    input: TableUpdateInput
    ): Promise<TableUpdateOutput> {
    const table = await this.tableRepository.findOne({ where : {id : tableId}});
    table.title = input.title;
    table.places = input.places;
    table.available = input.statut;
    await table.save();
    return { table };
  }

  async tableDelete(
    tableId: Table['id']
    ) : Promise<TableDeleteOutput> {
    const table = await this.tableRepository.findOne({ where : {id : tableId}});
    await table.remove();
    return { tableId };
  }

  async tablesPagination(
    args: TablesPaginationArgs
    ): Promise<TablesPagination> {
      const qb = this.tableRepository.createQueryBuilder('table');
      qb.take(args.take)
      qb.skip(args.skip)
      if (args.sortBy) {
        if (args.sortBy.createAt !== null) {
          qb.addOrderBy(
            'table.createdAt',
            args.sortBy.createAt === SortDirection.ASC ? 'ASC' : 'DESC'
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