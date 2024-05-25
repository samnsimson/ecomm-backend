import { Injectable, NotFoundException } from '@nestjs/common';
import { SettingsInput } from './dto/settings.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class SettingsService {
	constructor(@InjectRepository(Setting) private readonly settings: Repository<Setting>) {}

	async create(settingsInput: Partial<SettingsInput>) {
		const settings = this.settings.create(settingsInput);
		return await this.settings.save(settings);
	}

	async find(args: FindManyOptions<Setting>) {
		return await this.settings.find({ ...args });
	}

	async findOne(id: string, args?: FindOneOptions<Setting>) {
		return await this.settings.findOne({ where: { id }, ...args });
	}

	async update(id: string, settingsInput: SettingsInput) {
		const { affected } = await this.settings.update(id, settingsInput);
		if (!affected) throw new NotFoundException('Unable to update, Settings not found');
		return await this.findOne(id);
	}
}
