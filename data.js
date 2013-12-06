var projectTreeSingle = 
    {
        name: 'RallyTrial',
        children: [
            {
                name: 'Company',
                alias: 'company',
                children: [
                    {
                        name: 'Line of Business',
                        alias: 'business',
                        children: [
                            {
                                name: 'Pilot Team',
                                alias: 'pilot-team',
                                children: [
                                    {
                                        name: 'Company Team',
                                        alias: 'company-team'
                                    },
                                    {
                                        name: 'Rally Team',
                                        alias: 'rally-team'
                                    }]
                            }]
                    }]
            }
        ]
    }

var artifactTreeSingle = 
    {
        type: 'PortfolioItem/Initiative',
        name: 'Successful Trial Pilot with (Line of Business Group)',
        children: [
            {
                type: 'PortfolioItem/Feature',
                name: 'Administrative Activities',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Trial agreements',
                        children: [
                            { type: 'Task', name: 'NDA' },
                            { type: 'Task', name: 'Info Security' },
                            { type: 'Task', name: 'Procurement' },
                            { type: 'Task', name: 'Rally Deployment' },
                            { type: 'Task', name: 'Identify Pilot Team' }
                        ]
                    }
                ]
            }
        ]
    }

var projectTreeMulti = 
	{
        name: 'RallyTrial',
        children: [
            {
                name: 'Company',
                alias: 'company',
                children: [
                    {
                        name: 'Line of Business',
                        alias: 'business',
                        children: [
                            {
                                name: 'Pilot Team',
                                alias: 'pilot-team',
                                children: [
                                    {
                                        name: 'Company Team',
                                        alias: 'company-team'
                                    },
                                    {
                                        name: 'Rally Team',
                                        alias: 'rally-team'
                                    }]
                            }]
                    }]
            }
        ]
    }

var artifactTreeMulti =
	{
        type: 'PortfolioItem/Initiative',
        name: 'Successful Trial Pilot with (Line of Business Group)',
        children: [
            {
                type: 'PortfolioItem/Feature',
                name: 'Administrative Activities',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Trial agreements',
                        children: [
                            { type: 'Task', name: 'NDA' },
                            { type: 'Task', name: 'Info Security' },
                            { type: 'Task', name: 'Procurement' },
                            { type: 'Task', name: 'Rally Deployment' },
                            { type: 'Task', name: 'Identify Pilot Team' }
                        ]
                    }
                ]
            },
            {
                type: 'PortfolioItem/Feature',
                name: 'Rally Training + Working Sessions',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Trial roadmap',
                        children: [
                            { type: 'Task', name: 'Rally and Company review and accept POV' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Rally/customer collaboration during trial',
                        children: [
                            {
                                type: 'HierarchicalRequirement',
                                name: "Understand Customer's organizational and operational environment",
                                children: [
                                    { type: 'Task', name: 'What is your Product-Team organizational structure to be managed using Agile approaches in Rally?' },
                                    { type: 'Task', name: 'What is driving your Agile and Lean Transformation?' },
                                    { type: 'Task', name: 'What is your organization hierarchy / structure?' },
                                    { type: 'Task', name: 'How do you organize your teams and / or work -- e.g. Team / Product / Feature / Component based?' },
                                    { type: 'Task', name: 'What do you report, to whom, and why?' }
                                ]
                            },
                            {
                                type: 'HierarchicalRequirement',
                                name: "Detailed Demo/Trial Kickoff Meeting",
                                children: [
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Setup',
                                        children: [
                                            { type: 'Task', name: 'Rally subscription configuration and setup overview' },
                                            { type: 'Task', name: 'Rally Workspace and Project Hierarchy overview' },
                                            { type: 'Task', name: 'Rally users and permissions overview' }
                                        ]
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Strategy (Business Level)',
                                        children: []
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Execution (Delvery Level)',
                                        children: [
                                            { type: 'Task', name: 'Support for Scrum and Kanban' }
                                        ]
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Extending Rally',
                                        children: [
                                            { type: 'Task', name: 'Apps and Dashboards' },
                                            { type: 'Task', name: 'Web Services API' }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'HierarchicalRequirement',
                                name: "Self help resources",
                                children: [
                                    {
                                        type: 'Task',
                                        name: 'Rally Online Help'
                                    },
                                    {
                                        type: 'Task',
                                        name: 'Rally Video Tutorials'
                                    },
                                    {
                                        type: 'Task',
                                        name: 'Rally Support'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'PortfolioItem/Feature',
                name: 'The TRIAL',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Configure organizational structure (Project Hierarchy)',
                        children: [
                            { type: 'Task', name: 'Create project structure in Rally' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Populate Team Backlog(s)',
                        children: [
                            { type: 'Task', name: '[RPM] create portfolio items' },
                            { type: 'Task', name: 'create stories' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Scrum',
                        children: [
                            { type: 'Task', name: 'Define Release and Iteration time-boxes' },
                            { type: 'Task', name: 'Plan Stories (Backlog) into Iterations' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Kanban',
                        children: [
                            { type: 'Task', name: 'Define Kanban States' },
                            { type: 'Task', name: '[RPM] Define PI level value stream' },
                            { type: 'Task', name: 'Add/configure team Kanban board(s)' },
                            { type: 'Task', name: '[RPM] Add/configure Portfolio Kanban board(s)' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Tracking',
                        children: [
                            { type: 'Task', name: 'Setup Pages (Dashboards)' },
                            { type: 'Task', name: 'Setup Apps' }
                        ]
                    }
                ]
            }
            
        ]
    };