import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}


  @Get('html-report')
  async getHtmlReport( @Res() response: Response ) {
    
    const htmlReport = this.extraReportsService.getHtmlReport();
    
    response.setHeader('Content-Type', 'application/pdf');
    
    htmlReport.pipe(response)
    
    htmlReport.end();
  }

  @Get('community-report')
  async getComunityReport( @Res() response: Response ) {
    
    const htmlReport = this.extraReportsService.getComunity();
    
    response.setHeader('Content-Type', 'application/pdf');
    
    htmlReport.pipe(response)
    
    htmlReport.end();
  }

  @Get('custom-size')
  async getCustomSize( @Res() response: Response ) {
    
    const htmlReport = this.extraReportsService.getCustomSize();
    
    response.setHeader('Content-Type', 'application/pdf');
    
    htmlReport.pipe(response)
    
    htmlReport.end();
  }
}
