import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { Setting } from './entities/setting.entity';
import { SettingsInput } from './dto/settings.input';

@Resolver(() => Setting)
export class SettingsResolver {
	constructor(private readonly settingsService: SettingsService) {}

	@Mutation(() => Setting)
	async saveSetting(@Args('settingsInput') settingsInput: SettingsInput) {
		const { id } = settingsInput;
		if (id) return await this.settingsService.update(id, settingsInput);
		const result = await this.settingsService.find({ order: { createdAt: 'DESC' }, take: 1 });
		const settings = result.pop();
		if (!settings) return await this.settingsService.create(settingsInput);
		return await this.settingsService.update(settings.id, settingsInput);
	}

	@Query(() => [Setting], { name: 'settings' })
	findAll() {
		return this.settingsService.find({ order: { createdAt: 'DESC' }, take: 1 });
	}

	@Query(() => Setting, { name: 'setting' })
	async find(@Args('id', { type: () => Int }) id: string) {
		const settings = await this.settingsService.find({ where: { id } });
		if (settings) return await this.settingsService.find({ order: { createdAt: 'DESC' }, take: 1 });
		return settings;
	}
}
