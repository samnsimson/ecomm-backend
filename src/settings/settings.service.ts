import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SettingsInput } from './dto/settings.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { getCacheKey } from 'src/_libs/utils/cache-key';

@Injectable()
export class SettingsService {
	private cacheKey: string = 'settings';

	constructor(
		@InjectRepository(Setting) private readonly settings: Repository<Setting>,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	async create(settingsInput: Partial<SettingsInput>) {
		const settings = this.settings.create(settingsInput);
		return await this.settings.save(settings);
	}

	async find(args: FindManyOptions<Setting>) {
		const cacheKey = getCacheKey(this.cacheKey, args);
		const cached = await this.cacheManager.get<Array<Setting>>(cacheKey);
		if (cached) return cached;
		const settings = await this.settings.find({ ...args });
		await this.cacheManager.set(cacheKey, settings);
		return settings;
	}

	async findOne(id: string, args?: FindOneOptions<Setting>) {
		const cacheKey = getCacheKey(this.cacheKey, id, args);
		const cached = await this.cacheManager.get<Setting>(cacheKey);
		if (cached) return cached;
		const setting = await this.settings.findOne({ where: { id }, ...args });
		await this.cacheManager.set(cacheKey, setting);
		return setting;
	}

	async update(id: string, settingsInput: SettingsInput) {
		const { affected } = await this.settings.update(id, settingsInput);
		if (!affected) throw new NotFoundException('Unable to update, Settings not found');
		await this.cacheManager.reset();
		return await this.findOne(id);
	}
}
