import { Injectable } from '@nestjs/common';
import { ActivityLogRepository } from './activityLog.repository';
import { ActivityLog } from './dto/activityLog.dto';
import { CustomResponse } from 'src/modal/CustomResponse.dto';

@Injectable()
export class ActivityLogService {constructor(private readonly repo: ActivityLogRepository) {}

    async CreateActivityLog(user_id: number,action_type: string,module_name: string,description: string): Promise<boolean>{
                    
        const dto = new ActivityLog();
        
        dto.user_id = user_id;
        dto.module_name=module_name;
        dto.description=description;
        dto.action_type=action_type;

        const repoRes = await this.repo.CreateActivityLog(dto)

        if(!repoRes.isSuccess){
            return false;
        }
        else{
            return true;
        }
    }

    async GetAll(pageNumber: number, pageSize: number): Promise<CustomResponse<ActivityLog>>{
    
            const response = new CustomResponse<ActivityLog>();
            const repoRes = await this.repo.GetAll(pageNumber, pageSize)
    
            if(!repoRes.isSuccess){
                response.isSuccess = false;
                response.message = 'Data fetch failed';
                response.statusCode = 400;
            }
            else{
                
                response.isSuccess = true;
                response.message = 'Successfull created a record';
                response.statusCode = 201;
                response.response = repoRes.response;
            }
            return response
        }

}