import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { Setting } from './entities/setting.entity';
import { SettingsInput } from './dto/settings.input';
import { Logger, NotFoundException } from '@nestjs/common';

@Resolver(() => Setting)
export class SettingsResolver {
	private readonly logger: Logger;

	constructor(private readonly settingsService: SettingsService) {
		this.logger = new Logger('Settings');
	}

	@Mutation(() => Setting)
	async saveSetting(@Args('settingsInput') settingsInput: SettingsInput) {
		try {
			const settings = await this.find(settingsInput.id);
			return await this.settingsService.update(settings.id, settingsInput);
		} catch (error) {
			this.logger.log('No settins found, Creating one!');
			return await this.settingsService.create(settingsInput);
		}
	}

	@Query(() => [Setting], { name: 'settings' })
	findAll() {
		return this.settingsService.find({ order: { createdAt: 'DESC' }, take: 1 });
	}

	@Query(() => Setting, { name: 'setting' })
	async find(@Args('id', { type: () => Int, nullable: true }) id?: string) {
		if (id) return await this.settingsService.findOne(id);
		const result = await this.settingsService.find({ order: { createdAt: 'DESC' }, take: 1 });
		const settings = result.pop();
		if (!settings) throw new NotFoundException('Settings not found');
		return settings;
	}
}
