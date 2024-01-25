import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { Response } from 'express';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('/fichaPago')
  async getFichaPago(@Query('id') id: number, @Res() res: Response) {
    if (!id)
      throw new BadRequestException('No se proporciono el id del aspirante');
    const data = await this.reportesService.getFichaPago(id);

    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', 'attachment; filename="ficha-pago.pdf"');

    data.document.pipe(res);
  }
}
