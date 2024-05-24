import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { Setting } from './entities/setting.entity';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';

@Resolver(() => Setting)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Mutation(() => Setting)
  createSetting(@Args('createSettingInput') createSettingInput: CreateSettingInput) {
    return this.settingsService.create(createSettingInput);
  }

  @Query(() => [Setting], { name: 'settings' })
  findAll() {
    return this.settingsService.findAll();
  }

  @Query(() => Setting, { name: 'setting' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.settingsService.findOne(id);
  }

  @Mutation(() => Setting)
  updateSetting(@Args('updateSettingInput') updateSettingInput: UpdateSettingInput) {
    return this.settingsService.update(updateSettingInput.id, updateSettingInput);
  }

  @Mutation(() => Setting)
  removeSetting(@Args('id', { type: () => Int }) id: number) {
    return this.settingsService.remove(id);
  }
}
