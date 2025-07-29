
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, Globe, Users, Shield, Database, Mail } from 'lucide-react';
import { SiteSettingsService } from '@/lib/sdk';
import { toast } from 'sonner';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  registrationEnabled: boolean;
  bannerEnabled: boolean;
  maintenanceMode: boolean;
  maxStudents: number;
  monthlyFee: number;
  registrationFee: number;
  contactEmail: string;
  contactPhone: string;
  whatsappChannel: string;
  telegramChannel: string;
  bannerText: string;
  earlyBirdPrice: string;
  countdownEndDate: string;
}

export const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'MuslimJambite',
    siteDescription: 'Islamic Knowledge Hub for Muslim Students',
    registrationEnabled: true,
    bannerEnabled: true,
    maintenanceMode: false,
    maxStudents: 1000,
    monthlyFee: 1500,
    registrationFee: 500,
    contactEmail: 'muslimgrowth@gmail.com',
    contactPhone: '+2349158480530',
    whatsappChannel: '',
    telegramChannel: '',
    bannerText: 'Early Bird ends:',
    earlyBirdPrice: '₦500',
    countdownEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      console.log('Loading site settings...');
      const settingsData = await SiteSettingsService.getSettings();
      
      // Map settings to state
      const settingsMap = settingsData.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, string>);

      setSettings(prev => ({
        ...prev,
        bannerEnabled: settingsMap.banner_enabled !== 'false',
        bannerText: settingsMap.banner_text || prev.bannerText,
        earlyBirdPrice: settingsMap.early_bird_price || prev.earlyBirdPrice,
        countdownEndDate: settingsMap.countdown_end_date ? new Date(settingsMap.countdown_end_date).toISOString().split('T')[0] : prev.countdownEndDate
      }));
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Failed to load settings.');
    }
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      console.log('Saving settings:', settings);
      
      // Save individual settings
      await Promise.all([
        SiteSettingsService.setSetting('banner_enabled', settings.bannerEnabled.toString(), 'boolean'),
        SiteSettingsService.setSetting('banner_text', settings.bannerText, 'string'),
        SiteSettingsService.setSetting('early_bird_price', settings.earlyBirdPrice, 'string'),
        SiteSettingsService.setSetting('countdown_end_date', new Date(settings.countdownEndDate).toISOString(), 'date'),
        SiteSettingsService.setSetting('registration_enabled', settings.registrationEnabled.toString(), 'boolean'),
        SiteSettingsService.setSetting('maintenance_mode', settings.maintenanceMode.toString(), 'boolean'),
        SiteSettingsService.setSetting('monthly_fee', settings.monthlyFee.toString(), 'number'),
        SiteSettingsService.setSetting('registration_fee', settings.registrationFee.toString(), 'number'),
        SiteSettingsService.setSetting('max_students', settings.maxStudents.toString(), 'number'),
        SiteSettingsService.setSetting('contact_email', settings.contactEmail, 'string'),
        SiteSettingsService.setSetting('contact_phone', settings.contactPhone, 'string'),
        SiteSettingsService.setSetting('whatsapp_channel', settings.whatsappChannel, 'string'),
        SiteSettingsService.setSetting('telegram_channel', settings.telegramChannel, 'string')
      ]);

      // Clear countdown target date to restart countdown
      localStorage.removeItem('countdown_target_date');
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Error saving settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key: keyof SiteSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your site settings and preferences</p>
        </div>
        <Button onClick={saveSettings} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="registration" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Registration</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>Database</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Site Name</Label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  placeholder="Enter site name"
                />
              </div>
              <div>
                <Label>Site Description</Label>
                <Textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  placeholder="Enter site description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Banner Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Registration Banner</Label>
                  <p className="text-sm text-gray-600">Show/hide the registration banner</p>
                </div>
                <Switch
                  checked={settings.bannerEnabled}
                  onCheckedChange={(value) => handleSettingChange('bannerEnabled', value)}
                />
              </div>
              <div>
                <Label>Banner Text</Label>
                <Input
                  value={settings.bannerText}
                  onChange={(e) => handleSettingChange('bannerText', e.target.value)}
                  placeholder="Early Bird ends:"
                />
              </div>
              <div>
                <Label>Early Bird Price</Label>
                <Input
                  value={settings.earlyBirdPrice}
                  onChange={(e) => handleSettingChange('earlyBirdPrice', e.target.value)}
                  placeholder="₦500"
                />
              </div>
              <div>
                <Label>Countdown End Date</Label>
                <Input
                  type="date"
                  value={settings.countdownEndDate}
                  onChange={(e) => handleSettingChange('countdownEndDate', e.target.value)}
                />
                <p className="text-sm text-gray-600 mt-1">The date when the countdown timer will end.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Site Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Student Registration</Label>
                  <p className="text-sm text-gray-600">Enable/disable new student registrations</p>
                </div>
                <Switch
                  checked={settings.registrationEnabled}
                  onCheckedChange={(value) => handleSettingChange('registrationEnabled', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Enable maintenance mode (disables site access)</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(value) => handleSettingChange('maintenanceMode', value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Monthly Fee (₦)</Label>
                <Input
                  type="number"
                  value={settings.monthlyFee}
                  onChange={(e) => handleSettingChange('monthlyFee', parseInt(e.target.value))}
                  min="0"
                />
              </div>
              <div>
                <Label>Registration Fee (₦)</Label>
                <Input
                  type="number"
                  value={settings.registrationFee}
                  onChange={(e) => handleSettingChange('registrationFee', parseInt(e.target.value))}
                  min="0"
                />
              </div>
              <div>
                <Label>Maximum Students</Label>
                <Input
                  type="number"
                  value={settings.maxStudents}
                  onChange={(e) => handleSettingChange('maxStudents', parseInt(e.target.value))}
                  min="1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={settings.contactPhone}
                  onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
                  placeholder="+234..."
                />
              </div>
              <div>
                <Label>WhatsApp Channel</Label>
                <Input
                  value={settings.whatsappChannel}
                  onChange={(e) => handleSettingChange('whatsappChannel', e.target.value)}
                  placeholder="https://whatsapp.com/channel/..."
                />
              </div>
              <div>
                <Label>Telegram Channel</Label>
                <Input
                  value={settings.telegramChannel}
                  onChange={(e) => handleSettingChange('telegramChannel', e.target.value)}
                  placeholder="https://t.me/..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-700">
                  Security settings are managed through environment variables. Contact your system administrator to modify these settings.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Admin Credentials</Label>
                <Badge variant="outline">Configured via VITE_ADMIN_CREDENTIALS</Badge>
              </div>
              <div className="space-y-2">
                <Label>Payment Security</Label>
                <Badge variant="outline">Configured via Paystack environment variables</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Database operations are managed through the GitHub SDK. Monitor your repository for data integrity.
                </p>
              </div>
              <div className="space-y-2">
                <Label>GitHub Repository</Label>
                <Badge variant="outline">{import.meta.env.VITE_GITHUB_REPO || 'Not configured'}</Badge>
              </div>
              <div className="space-y-2">
                <Label>Database Branch</Label>
                <Badge variant="outline">{import.meta.env.VITE_GITHUB_BRANCH || 'main'}</Badge>
              </div>
              <Button variant="outline" onClick={() => window.open(`https://github.com/${import.meta.env.VITE_GITHUB_OWNER}/${import.meta.env.VITE_GITHUB_REPO}`, '_blank')}>
                View Repository
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
