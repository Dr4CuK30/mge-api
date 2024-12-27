import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TransferService } from 'src/modules/transfer/transfer.service';
import { CustomHttpException } from '../errors/custom-exceptions';
import { ExtendedRequest } from '../dtos/extended-request.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { errorTypes } from '../errors/error-types';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private transferService: TransferService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    let transferProjectId;
    let transferOrganizationalUnitId;
    const transferId = request.params.transferId;
    if (transferId) {
      const transfer = await this.transferService.findTransfer({
        id: transferId,
      });
      if (!transfer) {
        throw new CustomHttpException(errorTypes.TRANSFER_NOT_FOUND, {
          message: 'Transfer not found',
          transferId: 0,
        });
      }
      transferProjectId = transfer.project.id;
      transferOrganizationalUnitId = transfer.organizationalUnit.id;
    }
    const projectId =
      transferProjectId || +request.body.projectId || +request.query.projectId;
    const organizationalUnitId =
      transferOrganizationalUnitId ||
      +request.body.organizationalUnitId ||
      +request.query.organizationalUnitId;
    if (projectId) {
      this.validateProjectPermissions(request.user, projectId);
    }
    if (organizationalUnitId) {
      this.validateOrganizationalUnitPermissions(
        request.user,
        organizationalUnitId,
      );
    }
    return true;
  }

  private validateProjectPermissions(user: User, projectId: number) {
    if (!user.projects.some((project) => project.id === projectId)) {
      throw new CustomHttpException(errorTypes.PROJECT_NOT_ALLOWED, {
        requiredProject: projectId,
        userProjects: user.projects.map((project) => project.id),
      });
    }
  }

  private validateOrganizationalUnitPermissions(
    user: User,
    organizationalUnitId: number,
  ) {
    if (
      !user.organizationalUnits.some(
        (organizationalUnit) => organizationalUnit.id === organizationalUnitId,
      ) ||
      !user.projects.some((project) =>
        project.organizationalUnits.some(
          (organizationalUnit) =>
            organizationalUnit.id === organizationalUnitId,
        ),
      )
    ) {
      throw new CustomHttpException(
        errorTypes.ORGANIZATIONAL_UNIT_NOT_ALLOWED,
        {
          requiredOrganizationalUnit: organizationalUnitId,
          userOrganizationalUnits: user.organizationalUnits
            .map((organizationalUnit) => organizationalUnit.id)
            .concat(
              user.projects
                .map((project) =>
                  project.organizationalUnits.map(
                    (organizationalUnit) => organizationalUnit.id,
                  ),
                )
                .flat(),
            ),
        },
      );
    }
  }
}
